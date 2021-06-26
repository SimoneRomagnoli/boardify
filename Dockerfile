FROM node:16

ENV WORKINGDIR=/root/boardify
WORKDIR ${WORKINGDIR}

RUN mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}

COPY ./boardify ${WORKINGDIR}/

RUN apt-get -y update                                          && \
    apt-get -y install apt-utils                               && \
    apt-get -y clean

RUN npm install

EXPOSE 3000

CMD node index.js
