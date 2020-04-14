configatron.configure_from_hash(
  recaptcha_enabled: ENV['RECAPTCHA_ENABLED'],
  front_end_base_url: ENV['FRONT_END_BASE_URL'],
  from_email: ENV['MAILER_SENDER']
)
