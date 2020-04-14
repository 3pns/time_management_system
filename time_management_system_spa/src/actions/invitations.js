let Invitations = {}
Invitations.types = {}
Invitations.types.CREATE = 'CREATE_INVITATION';
Invitations.types.ALL = 'GET_INVITATIONS';
Invitations.types.GET = 'GET_INVITATION';
Invitations.types.DELETE = 'DELETE_INVITATION';

Invitations.types.UPDATE_ITEM = 'UPDATE_INVITATION';
Invitations.types.UPDATE_COLLECTION = 'UPDATE_INVITATIONS';
Invitations.types.UPDATE_COLLECTION_WITH_ITEM = 'UPDATE_INVITATIONS_WITH_INVITATION';
Invitations.types.UPDATE_ERRORS = 'UPDATE_INVITATIONS_ERRORS';

export default Invitations;
