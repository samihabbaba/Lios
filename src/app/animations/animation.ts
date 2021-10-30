import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function fadeInOut(): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(350, style({ opacity: 1 })),
    ]),
    transition(':leave', [animate(0, style({ opacity: 0 }))]),
  ]);
}
