import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './footer.scss';

export type FooterProps = {};

const Footer: Component<FooterProps> = () => {
  const component = new forgo.Component<FooterProps>({
    render() {
      return (
        <footer>
          <p>&copy; {new Date().getFullYear()} <a href="https://github.com/chronoDave">Chronocide</a></p>
          <p><a href="https://github.com/chronoDave/pebble">Source code</a></p>
        </footer>
      );
    }
  });

  return component;
};

export default Footer;
