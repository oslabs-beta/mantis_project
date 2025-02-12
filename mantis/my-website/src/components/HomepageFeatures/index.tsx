import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Dynamic Loading',
    Svg: require('@site/static/img/mantisFly.svg').default,
    description: (
      <>
        Routes traffic intelligently using real-time Prometheus metrics, ensuring efficient microservice distribution and preventing overload.
      </>
    ),
  },
  {
    title: 'Performance Monitoring',
    Svg: require('@site/static/img/mantisStand.svg').default,
    description: (
      <>
        Tracks resource usage trends to help engineers manually optimize scaling decisions, improving efficiency and reducing costs.
      </>
    ),
  },
  {
    title: 'Seamless Observability',
    Svg: require('@site/static/img/mantisHead.svg').default,
    description: (
      <>
        Engineers gain instant visibility into microservice performance with Prometheus, InfluxDB,Grafana dashboards for realtime troubleshooting.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
