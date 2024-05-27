import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

export interface TabItem {
  label: string;
  to: string;
  icon?: React.ReactNode | ((context: { active: boolean }) => React.ReactNode);
}

export interface TabbarProps {
  tabs: TabItem[];
}

export const Tabbar: React.FC<TabbarProps> = (props) => {
  const { tabs } = props;

  const location = useLocation();

  return (
    <div className="flex shrink-0 items-center justify-center gap-10 border-t border-[#F9FAFB] bg-white">
      {tabs.map((tab) => (
        <Link className={classNames('py-4 flex items-center justify-center')} key={tab.to} to={tab.to}>
          <div
            className={classNames(
              'flex py-4 px-2 text-xs justify-center gap-1 flex-col items-center w-[100px] h-[62px] rounded-[6px] transition-all duration-200 text-[#98A2B3]',
              {
                '!text-[#0052FF]': tab.to === location.pathname
              }
            )}
          >
            <span className="">
              {typeof tab.icon === 'function' ? tab.icon({ active: tab.to === location.pathname }) : tab.icon}
            </span>
            <span className="">{tab.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
