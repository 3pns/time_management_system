class InvitationMailer < ApplicationMailer
  default from: configatron.from_email
  layout 'mailer'

  def new_invitation_email
    @front_end_base_url = "#{configatron.front_end_base_url}"
    @invitation = Invitation.find(params[:invitation_id])
    @invitation_token = @invitation.invitation_token
    @front_end_base_url = "#{configatron.front_end_base_url}"
    @sender = "#{@invitation.invited_by.first_name} #{@invitation.invited_by.last_name}"
    p "efeferferpfepwfepoqwfkerqpo]fkpoeqfkq3op[fkj"
    p @invitation #invitation_token
    mail(
      to: @invitation.email, 
      invitation_token: @invitation.invitation_token,
      sender:  "#{@invitation.invited_by.first_name} #{@invitation.invited_by.last_name}",
      front_end_base_url: "#{configatron.front_end_base_url}"
    )
    end
end
