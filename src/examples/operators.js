import { pipe, of, merge } from 'rxjs';
import { startWith, pluck, shareReplay, retryWhen, delay, tap, filter, mapTo, take } from 'rxjs/operators';

export function vstream(payload) {
  return {
    data: undefined,
    event: {
      msg: payload
    }
  };
}

export function stream(event) {
  return pipe(
    startWith(vstream(event)),
    pluck('event', 'msg')
  );
}

export function refetch(times = 5, timeout = 2000) {
  return pipe(
    shareReplay(times),
    retryWhen(err => err.pipe(
      delay(2000),
      take(times)
    )
    )
  );
}

export function loading(positive, negative, init = false) {
  return merge(
    of(init),
    positive.pipe(mapTo(true)),
    negative.pipe(mapTo(false))
  );
}

export function success(msg) {
  return pipe(
    filter(code => code === 0),
    tap(() => {
      console.log(msg);
    })
  );
}

export function fail(msg) {
  return pipe(
    filter(code => code !== 0),
    tap(() => {
      console.log(msg);
    })
  );
}
