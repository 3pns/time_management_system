FROM ruby:2.6.6-alpine3.11
ARG RAILS_ENV
ENV RAILS_ROOT /opt/time_management_system
ENV RAILS_SERVE_STATIC_FILES true
ENV BUNDLE_APP_CONFIG vendor/bundle
ENV BUNDLE_PATH vendor/bundle
ENV GEM_HOME vendor/bundle
ENV PATH="/opt/time_management_system/vendor/bundle/bin:${PATH}"
RUN apk update
RUN apk add --no-cache libxml2-dev libxslt-dev postgresql-dev nodejs libcurl 
RUN apk add build-base
WORKDIR $RAILS_ROOT
RUN gem install bundler
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --jobs $(nproc)
COPY . .
EXPOSE 3000
CMD ["puma", "-C", "config/puma.rb"]
