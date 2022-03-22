import os
import typing
import logging


log = logging.getLogger(__name__)


class MissingSettingError(Exception):
    """
    Exception raised when a :func:`.setting` cannot be found.
    """
    
    def __init__(self, name: str) -> None:
        self.name: str = name

    def __str__(self) -> str:
        return f"Neither {self.name} or {self.name}_FILENAME are set, and the setting is required"


def setting_required(name) -> str:
    """
    Try to read the setting with the given ``name`` from the following places:

    - The contents of the file specified at the ``{name}_FILENAME`` environment variable.
    - The contents of the ``{name}`` environment variable.

    Empty strings are considered falsy values, and are ignored.

    :raises .MissingSettingError: if all places were tried and no meaningful value was found.
    """

    log.debug(f"Reading setting with name {name}")

    if setting_filename := os.environ.get(f"{name}_FILENAME"):
        log.debug(f"Setting {name} is set via filename at {setting_filename}")
        with open(setting_filename) as file:
            setting = file.read().strip()
    elif setting := os.environ.get("BOT_KEY"):
        log.debug(f"Setting {name} is set via environment variable")
    else:
        raise MissingSettingError(name)

    return setting


def setting_optional(name) -> typing.Optional[str]:
    """
    Like :func:`.setting`, but returns :data:`None` instead of raising an exception.
    """

    try:
        return setting_required(name)
    except MissingSettingError:
        return None


# Required settings
ROOT_URL = setting_required("ROOT_URL")
JWT_KEY = setting_required("JWT_KEY")
DB_URI = setting_required("DB_URI")

# Also required, but not set here:
# BIND_IP
# BIND_PORT

# Optional settings
BOT_KEY = setting_optional("BOT_KEY")
BOT_CHANNEL = setting_optional("BOT_CHANNEL")
