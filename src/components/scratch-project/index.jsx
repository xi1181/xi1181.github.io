import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { skeleton } from '../../helpers/utils';
import LazyImage from '../lazy-image';

const displaySection = (externalProjects) => {
  if (
    externalProjects &&
    Array.isArray(externalProjects) &&
    externalProjects.length
  ) {
    return true;
  } else {
    return false;
  }
};

const ExternalProject = ({ scratchProjects, loading, scratchConfig }) => {
  const renderSkeleton = () => {
    let array = [];
    for (let index = 0; index < scratchConfig.length; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        width: 'w-32',
                        height: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h2>
                    <div className="avatar w-full h-full">
                      <div className="w-20 h-20 mask mask-squircle mx-auto">
                        {skeleton({
                          width: 'w-full',
                          height: 'h-full',
                          shape: '',
                        })}
                      </div>
                    </div>
                    <div className="mt-2">
                      {skeleton({
                        width: 'w-full',
                        height: 'h-4',
                        className: 'mx-auto',
                      })}
                    </div>
                    <div className="mt-2 flex items-center flex-wrap justify-center">
                      {skeleton({
                        width: 'w-full',
                        height: 'h-4',
                        className: 'mx-auto',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return array;
  };

  const renderExternalProjects = () => {
    return scratchProjects.map((item, index) => (
      <a
        className="card shadow-lg compact bg-base-100 cursor-pointer"
        key={index}
        href={`https://scratch.mit.edu/projects/${item.id}`}
        onClick={(e) => {
          e.preventDefault();

          window?.open(`https://scratch.mit.edu/projects/${item.id}`, '_blank');
        }}
      >
        <div className="p-8 h-full w-full">
          <div className="flex items-center flex-col">
            <div className="w-full">
              <div className="px-4">
                <div className="text-center w-full">
                  <h2 className="font-semibold text-lg tracking-wide text-center opacity-60 mb-2">
                    {item.title}
                  </h2>
                  {item.image && (
                    <div className="avatar opacity-90">
                      <div className="w-20 h-20 mask mask-squircle">
                        <LazyImage
                          src={item.image}
                          alt={'thumbnail'}
                          placeholder={skeleton({
                            width: 'w-full',
                            height: 'h-full',
                            shape: '',
                          })}
                        />
                      </div>
                    </div>
                  )}
                  <p className="mt-1 text-base-content text-opacity-60 text-sm">
                    {item.instructions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      {displaySection(scratchProjects) && (
        <div className="col-span-1 lg:col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <div className="card compact bg-base-100 shadow bg-opacity-40">
                <div className="card-body">
                  <div className="mx-3 flex items-center justify-between mb-2">
                    <h5 className="card-title">
                      {loading ? (
                        skeleton({ width: 'w-40', height: 'h-8' })
                      ) : (
                        <span className="text-base-content opacity-70">
                          My Scratch Projects
                        </span>
                      )}
                    </h5>
                    {loading ? (
                      skeleton({ width: 'w-10', height: 'h-5' })
                    ) : (
                      <a
                        href={`https://scratch.mit.edu/users/${scratchConfig.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base-content opacity-50 hover:underline"
                      >
                        See All
                      </a>
                    )}
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {loading ? renderSkeleton() : renderExternalProjects()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

ExternalProject.propTypes = {
  scratchProjects: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  scratchConfig: PropTypes.object.isRequired,
};

export default ExternalProject;
