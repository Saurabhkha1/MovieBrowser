import {faSoundcloud} from '@fortawesome/free-brands-svg-icons';
import {
  faAngleLeft,
  faClose,
  faPeopleGroup,
  faPlay,
  faSearch,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import {Icons} from '../../../src/utils/icons';

describe('Icons', () => {
  it('should contain the correct icons', () => {
    expect(Icons.nowPlaying).toBe(faPlay);
    expect(Icons.topRated).toBe(faStar);
    expect(Icons.popular).toBe(faPeopleGroup);
    expect(Icons.upcoming).toBe(faSoundcloud);
    expect(Icons.backIcon).toBe(faAngleLeft);
    expect(Icons.search).toBe(faSearch);
    expect(Icons.close).toBe(faClose);
  });
});
