class ApplicationMailer < ActionMailer::Base
  default from: configatron.from_email
  layout 'mailer'
end
