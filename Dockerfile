FROM ruby:2.6.6-alpine3.11
ARG RAILS_ENV
ENV RAILS_ROOT /opt/toptal_time_management_system
ENV RAILS_SERVE_STATIC_FILES true
ENV BUNDLE_APP_CONFIG vendor/bundle
ENV BUNDLE_PATH vendor/bundle
ENV GEM_HOME vendor/bundle
ENV PATH="/opt/toptal_time_management_system/vendor/bundle/bin:${PATH}"
RUN apk update
RUN apk add --no-cache libxml2-dev postgresql-dev nodejs libcurl
WORKDIR $RAILS_ROOT
COPY vendor/bundle /opt/toptal_time_management_system/vendor/bundle
COPY . .
EXPOSE 3000
CMD ["puma", "-C", "config/puma.rb"]
