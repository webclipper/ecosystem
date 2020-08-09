import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import lazyLoadImage from './lazyLoadImage';
import hexoCodeBlock from './hexoCodeBlock';
import noScript from './noScript';
import wechatCodeBlock from './wechatCodeBlock';
import ibmCodeBlock from './ibmCodeBlock';
import mediumCodeBlock from './mediumCodeBlock';
import csdnCodeBlock from './csdnCodeBlock';
import yuqueTableCard from './yuqueTableCard';
import mediumImage from './mediumImage';
import zhihuGif from './zhihuGif';
import gcoresGallery from './gcoresGallery';
import typoraCodeBlock from './typoraCodeBlock';
import juejinCodeBlock from './juejinCodeBlock';

export default function plugins(turndownService: TurndownService) {
  turndownService.use([
    gfm,
    lazyLoadImage,
    hexoCodeBlock,
    noScript,
    wechatCodeBlock,
    ibmCodeBlock,
    mediumCodeBlock,
    csdnCodeBlock,
    yuqueTableCard,
    mediumImage,
    zhihuGif,
    gcoresGallery,
    typoraCodeBlock,
    juejinCodeBlock,
  ]);
}
