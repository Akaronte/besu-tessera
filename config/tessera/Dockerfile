FROM alpine:latest AS builder
ARG TESSERA_MODE
ARG TESSERA_HOSTNAME

COPY data /data
COPY generate.sh generate.sh

RUN chmod 777 -R data

RUN chmod +x generate.sh
ENV TESSERA_MODE=${TESSERA_MODE}
ENV TESSERA_HOSTNAME=${TESSERA_HOSTNAME}

RUN sh generate.sh

FROM quorumengineering/tessera:latest

USER root


# develop uses a debain container, all releases use an alpine container - this allows both to be used for the quickstart
# set the version in ../../.env
RUN if [ -e /sbin/apk ] ; then apk add gettext --no-cache ; else apt-get update && apt-get install -y gettext && rm -rf /var/lib/apt/lists/* ; fi

ENV JAVA_OPTS="-Dlogback.configurationFile=/data/logback.xml"

RUN mkdir /data

RUN chmod 777 -R data

COPY docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
COPY /data/logback.xml /data/logback.xml
COPY --from=builder /data/tessera-config.json /data/tessera-config.json

RUN chmod 777 -R data

RUN chmod +x /usr/bin/docker-entrypoint.sh

ENTRYPOINT ["sh","/usr/bin/docker-entrypoint.sh"]