import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import lazyLoadImage from './lazyLoadImage';
import hexoCodeBlock from './hexoCodeBlock';
import noScript from './noScript';
import wechatCodeBlock from './wechatCodeBlock';
import ibmCodeBlock from './ibmCodeBlock';
import mediumCodeBlock from './mediumCodeBlock';

export default function plugins(turndownService: TurndownService) {
  turndownService.use([gfm, lazyLoadImage, hexoCodeBlock, noScript, wechatCodeBlock, ibmCodeBlock, mediumCodeBlock]);
}
