import {
  trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

export const ROUTER_ANIMATION_STATUS = {
  expanding: 'expanding',
  expandEnd: 'expand-end',
  startLeavingPage: 'start-leaving-page',
  leavingPage: 'leaving-page',
  leftPage: 'left-page'
}

export const slideInOutAnimation =
  trigger('routeAnimation', [
    transition('* <=> slideInOutRight', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '-2px 0 6px rgb(0 0 0 / 50%)'
        })
      ], { optional: true }),
      query(':enter', [
        style({ right: '-100%' })
      ], { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ right: '-100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ right: '0%' }))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);

export const expandtAnimation =
  trigger('outterRouteAnimation', [
    state(ROUTER_ANIMATION_STATUS.expanding, style({
      opacity: 1,
      height: '100%',
      width: '100%',
      transformOrigin: 'center',
      left: 0,
      top: 0,
    })),
    state(ROUTER_ANIMATION_STATUS.expandEnd, style({
      opacity: 0,
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
    })),
    state(ROUTER_ANIMATION_STATUS.startLeavingPage, style({
      height: '100%',
      width: '100%',
      transformOrigin: 'center top',
      opacity: 1
    })),
    state(ROUTER_ANIMATION_STATUS.leftPage, style({
      height: '100%',
      width: '100%',
      opacity: 1,
      transform: 'translateY(100%)'
    })),
    transition(`* => ${ROUTER_ANIMATION_STATUS.expanding}`, [
      animate('300ms ease-out'),
    ]),
    transition(`${ROUTER_ANIMATION_STATUS.expanding} => ${ROUTER_ANIMATION_STATUS.expandEnd}`, [
      animate('300ms ease-out'),
    ]),
    transition(`* => ${ROUTER_ANIMATION_STATUS.startLeavingPage}`, [
      animate('300ms ease-out'),
    ]),
    transition(`${ROUTER_ANIMATION_STATUS.startLeavingPage} => ${ROUTER_ANIMATION_STATUS.leftPage}`, [
      animate('300ms ease-out'),
    ]),
  ]);
