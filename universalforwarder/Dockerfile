FROM cribl/universalforwarder:8.0.0
ADD gogen /etc/gogen
ADD https://api.gogen.io/linux/gogen /usr/bin/gogen
RUN chmod 755 /usr/bin/gogen
ENV SPLUNK_USER root
ENV SPLUNK_START_ARGS "--accept-license --answer-yes --seed-passwd admin"
ADD client.pem /var/opt/splunk/etc/auth/client.pem