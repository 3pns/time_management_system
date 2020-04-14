import { call, put } from 'redux-saga/effects'
import api from 'services/api'
import actions from 'actions'
import { toast } from 'services/utils'

class Invitations {

  static * get(action) {
     try { 
        const invitation = yield call(api.invitations.get, action.payload);
        if (invitation != null && action.payload.updateCollection){
          yield put({type: actions.invitations.types.UPDATE_COLLECTION_WITH_ITEM, payload: { invitation: invitation , id: invitation.id }});
        } else if (invitation != null && action.payload.updateItem){
          yield put({type: actions.invitations.types.UPDATE_ITEM, payload: { invitation: invitation , id: invitation.id }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * all(action) {
     try { 
        console.log(action)
        const invitations = yield call(api.invitations.all, action.payload);
        if (invitations != null){
          yield put({type: actions.invitations.types.UPDATE_COLLECTION, payload: { invitations: invitations }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * create(action) {
     try { 
        console.log("ERRORS INBEFORE")
        let invitation = yield call(api.invitations.create, action.payload);
        console.log(invitation)
        if (invitation.errors){
          console.log("ERRORS DTCED")
          yield put({type: actions.invitations.types.UPDATE_ERRORS, payload: { errors: invitation.errors }});
          invitation = null
        }
        if (invitation != null){
          toast("success", "Invitation created with success")
        }
        if (invitation != null && action.payload.updateCollection){
          yield put({type: actions.invitations.types.UPDATE_COLLECTION_WITH_ITEM, payload: { invitation: invitation , id: invitation.id }});
        } 
        if (invitation != null && action.payload.updateItem){
          yield put({type: actions.invitations.types.UPDATE_ITEM, payload: { invitation: invitation , id: invitation.id }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * delete(action) {
     try { 
        const invitation = yield call(api.invitations.delete, { id: action.payload.id });
        if (invitation != null){
          if (action.payload.updateItem){
            yield put({type: actions.invitations.types.UPDATE_ITEM, payload: { invitation: null, id: action.payload.id }});
          } else if(action.payload.updateCollection) {
            yield put({type: actions.invitations.types.UPDATE_COLLECTION_WITH_ITEM, payload: { invitation: null , id: action.payload.id }});
          }
          toast("success", "Deleted invitation with success")
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

}

export default Invitations
