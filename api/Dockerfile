FROM ruby:2.4.2

RUN apt-get update -qq && apt-get install -y build-essential

RUN apt-get install -y nodejs

ENV APP_HOME /myapp
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]