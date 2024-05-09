export const SET_AUTHENTICATED = 'set_authenticated'
export const SET_PROFILE_CARD = 'set_profile_card'
export const GET_PROFILE_CARD = 'get_profile_card'
export const REGISTER_FORM = 'register_form'
export const SUBMIT_REGISTER_FORM = 'submit_register_form'
export const LOGIN_FORM = 'login_form'
export const SET_PROFILE = 'set_profile'
export const SUBMIT_LOGIN_FORM = 'submit_login_form'
export const CAPTION_FORM = 'caption_form'
export const SUBMIT_CAPTION = 'submit_caption'
export const ANSWER_FORM = 'answer_form'
export const SUBMIT_ANSWER_FORM = ' submit_answer_form'
export const CLICKED_POST_ANSWER = 'clicked_post_answer'
export const GET_PROFILE_FORM = 'get_profile_form'
export const RESET_LOGIN = 'reset_login'
export const GET_POSTS = 'get_posts'
export const SET_USER = 'set_user'
export const SET_CAPTION = 'set_caption'
export const PROFILE_CARDS_BY_HANDLE = 'profile_cards_by_handle'
export const SET_CURRENT_USER = 'set_current_user'
export const SET_TRIVIA_TOTAL = 'set_trivia_total'
export const GET_TRIVIA_TOTAL = 'get_trivia_total'
export const SET_GEN_STATUS = 'set_gen_status'
export const SET_CURRENT_USER_DATA = 'set_current_user_data'
export const GET_ALL_USERS = 'get_all_users'
export const CLICKED_POST_COMMENT = 'clicked_post_comment'
export const SELECT_COMMENT = 'select_comment'
export const UPDATE_PROFILE_CARD = 'update_profile_card'
export const SET_CURRENT_USER_SELECTED_PROFILE_CARD =
  'set_current_user_selected_profile_card'

  /*{state.clickedPostComment === true ? (
    <form
      class="form-style"
      onSubmit={(e) => handleProfileCardSubmit(e)}
    >
      <input
        type="text"
        name="captionForm"
        placeholder="Type a caption"
        value={state.captionForm}
        onChange={(e) =>
          dispatch({ type: CAPTION_FORM, payload: e.target.value })
        }
      ></input>
    </form>
  ) : (
    <p>{''}</p>
  )}*/