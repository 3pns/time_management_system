class MyApplicationFailureApp < Devise::FailureApp
  def http_auth_body
    # return super unless request_format == :json
    return { status: 401, error: i18n_message }.to_json
  end
end
