import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import lazyLoadImage from './lazyLoadImage';

export default function plugins(turndownService: TurndownService) {
  turndownService.use([gfm, lazyLoadImage]);
}
