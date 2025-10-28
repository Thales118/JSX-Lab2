/** @jsx createElement */
import { createElement, mount } from './jsx-runtime';
import { DashboardApp } from './dashboard';

const root = document.getElementById('app');
if (root) mount(<DashboardApp />, root);





