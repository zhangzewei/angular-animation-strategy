import {
  trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';


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
    state('start', style({
      opacity: 0.5,
    })),
    state('expand', style({
      opacity: 1,
      height: '100%',
      width: '100%',
      transformOrigin: 'center',
      left: 0,
      top: 0,
    })),
    state('end', style({
      opacity: 0,
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
    })),
    transition('start => expand', [
      animate('300ms ease-out'),
    ]),
    transition('expand => end', [
      animate('300ms ease-out'),
    ]),
  ]);
