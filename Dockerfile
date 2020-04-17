FROM ruby:2.6.6-alpine3.11
ARG RAILS_ENV
WORKDIR /opt/time_management_system
ENV RAILS_SERVE_STATIC_FILES true
RUN apk update
RUN apk add --no-cache libxml2-dev libxslt-dev postgresql-dev nodejs libcurl 
RUN apk add build-base
RUN gem install bundler
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --jobs $(nproc)
COPY . .
EXPOSE 3000
CMD ["puma", "-C", "config/puma.rb"]
