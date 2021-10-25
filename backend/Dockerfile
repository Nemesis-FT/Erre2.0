FROM python:3 AS base
LABEL maintainer="Stefano Pigozzi <me@steffo.eu>"

FROM base AS setup
RUN pip install poetry

FROM setup AS dependencies
WORKDIR /usr/src/
COPY ./pyproject.toml ./pyproject.toml
COPY ./poetry.lock ./poetry.lock
RUN poetry install --no-root

FROM dependencies AS install
COPY ./erre2 /usr/src/erre2
RUN poetry install

FROM install AS run
WORKDIR /usr/src/erre2
ENTRYPOINT ["poetry", "run"]
CMD ["python", "-m", "erre2"]
