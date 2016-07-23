/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';

export type Tab =
    'home'
  | 'notifications'
  | 'tasks'
  | 'team'
  | 'me'
  ;

type State = {
     tab: Tab
}

const initialState: State = {
    tab: 'home'
};

export default function navigation(state: State = initialState, action: Action): State {
    return state;
}
