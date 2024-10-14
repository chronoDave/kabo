import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import AddBoard from '../add-board/add-board';
import DeleteBoard from '../delete-board/delete-board';
import SelectBoard from '../select-board/select-board';

import './header.scss';

export type HeaderProps = {};

const Header: Component<HeaderProps> = () => {
  const component = new forgo.Component<HeaderProps>({
    render() {
      return (
        <header>
          <SelectBoard id='select-board' />
          <AddBoard />
          <DeleteBoard />
        </header>
      );
    }
  });

  return component;
};

export default Header;
