import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { compressToEncodedURIComponent } from 'lz-string';
import Icon from '../../components/icon/icon';
import store from '../../store/store';
import AddBoard from './add-board/add-board';
import DeleteBoard from './delete-board/delete-board';
import SelectBoard from './select-board/select-board';

export type HeaderProps = {};

const Header: Component<HeaderProps> = () => {
  const component = new forgo.Component<HeaderProps>({
    render() {
      return (
        <header>
          <SelectBoard id='select-board' />
          <AddBoard />
          <DeleteBoard />
          <button type='button' onclick={() => {
            try {
              void navigator.clipboard.writeText(compressToEncodedURIComponent(JSON.stringify(store.current)));
            } catch (err) {
              console.error(err);
            }
          }}>
            <Icon id='share' />
          </button>
        </header>
      );
    }
  });

  return component;
};

export default Header;
