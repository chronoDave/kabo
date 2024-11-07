import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../../components/icon/icon';
import DeleteBoard from './delete-board/delete-board';
import SelectBoard from './select-board/select-board';
import store from '../../../store/store';
import { create } from './header.state';

import './header.scss';

export type HeaderProps = {};

const Header: Component<HeaderProps> = () => {
  const component = new forgo.Component<HeaderProps>({
    render() {
      return (
        <header>
          <div>
            <svg aria-hidden="true" class='logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path class="fg" d="M11 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h6v18zm2 0h6c1.1 0 2-.9 2-2v-7h-8v9zm8-11V5c0-1.1-.9-2-2-2h-6v7h8z" />
            </svg>
            <SelectBoard id='select-board' />
            <button type='button' onclick={create}>
              <Icon id='plus' />
              <span class='sr-only'>Create board</span>
            </button>
            <DeleteBoard />
          </div>
          <div>
            <button type='button' onclick={() => store.undo()}>
              <Icon id='rotateLeft' />
              <span class='sr-only'>Undo</span>
            </button>
            {/* <button type='button' onclick={() => {
              try {
                void navigator.clipboard.writeText(compressToEncodedURIComponent(JSON.stringify(store.current)));
              } catch (err) {
                console.error(err);
              }
            }}>
              <Icon id='share' />
              <span class='sr-only'>Share</span>
            </button> */}
          </div>
        </header>
      );
    }
  });

  return component;
};

export default Header;
