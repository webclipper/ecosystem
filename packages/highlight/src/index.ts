import style from './index.less';

const highlight_class = style.highlightSelector;

export interface IHighlighter {
  start(): Promise<HTMLElement>;
}

export default class Highlighter {
  private previous: HTMLElement | null;

  constructor() {
    this.previous = null;
  }

  public start() {
    return new Promise((resolve, reject) => {
      $('html').one('click', event => {
        if (!this.previous) {
          return;
        }
        $(event.target).removeClass(highlight_class);
        $('html').off('mousemove', this.mousemoveEvent);
        this.previous = null;
        resolve(event.target);
        return false;
      });
      $('html').one('keydown', event => {
        if (event.keyCode === 27 && this.previous) {
          $('html')
            .find(`.${highlight_class}`)
            .removeClass(highlight_class);
          $('html').off('mousemove', this.mousemoveEvent);
          this.previous = null;
          event.preventDefault();
          reject(new Error('Cancel'));
        }
      });
      $('html').on('mousemove', this.mousemoveEvent);
    });
  }

  private mousemoveEvent = (
    event: JQuery.MouseMoveEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
  ) => {
    if (!event.target) {
      return;
    }
    if (!this.previous) {
      $(event.target).addClass(highlight_class);
    } else {
      $(this.previous).removeClass(highlight_class);
      $(event.target).addClass(highlight_class);
    }
    this.previous = event.target;
  };
}
