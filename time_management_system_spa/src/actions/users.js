let Users = {}
Users.types = {}
Users.types.CREATE = 'CREATE_USER';
Users.types.ALL = 'GET_USERS';
Users.types.GET = 'GET_USER';
Users.types.PATCH = 'PATCH_USER';
Users.types.DELETE = 'DELETE_USER';

Users.types.GET_USER_SETTINGS = 'GET_USER_SETTINGS';
Users.types.PATCH_USER_SETTINGS = 'PATCH_USER_SETTINGS';
Users.types.PATCH_NEW_PASSWORD = 'PATCH_USER_NEW_PASSWORD';

Users.types.UPDATE_ITEM = 'UPDATE_USER';
Users.types.UPDATE_COLLECTION = 'UPDATE_USERS';
Users.types.UPDATE_COLLECTION_WITH_ITEM = 'UPDATE_USERS_WITH_USER';
Users.types.UPDATE_ERRORS = 'UPDATE_USERS_ERRORS';

export default Users;
