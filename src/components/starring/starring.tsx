import { Fragment } from 'react';

type StarringProps = {
    star: string;
}

export default function Starring({star} : StarringProps) {
  return (
    <Fragment>
      {star},<br data-testid='star'/>
    </Fragment>
  );
}
