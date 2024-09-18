import { selector } from '../../store/store';

export default selector<string, boolean>(state => id => state?.active.menu === id);