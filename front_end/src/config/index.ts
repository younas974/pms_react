// icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/BarChartOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import CodeIcon from '@material-ui/icons/CodeOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import PrivateIcon from '@material-ui/icons/LockOutlined';
import PublicIcon from '@material-ui/icons/LockOpenOutlined';
import Provider from '../pages/Provider'

// components
import Home from '../pages/Home';
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard';
import GHPrivate from '../pages/GitHub/PrivateRepo';
import GHPublic from '../pages/GitHub/PublicRepo';
import CodeEditor from '../pages/CodeEditor';
import Settings from '../pages/Settings';

// interface
import RouteItem from '../model/RouteItem.model';
import { ThumbUp } from '@material-ui/icons';
import LogOut from '../components/logoutComponent';
import NotFoundComponent from '../components/404Component';
import viewFollow from '../components/followup/viewFollow';

// define app routes
export const routes: Array<RouteItem> = [
     

    // {
    //     key: "router-login",
    //     title: "Sign In",
    //     tooltip: "SignIn",
    //     path: "/",
    //     enabled: true,
    //     component: SignIn,
    //     icon: ThumbUpOutlinedIcon,
    //     appendDivider: true
    // },

    {
        key: "router-ghs",
        title: "Dashboard",
        tooltip: "GitHub",
        path: "/dashboard",
        enabled: true,
        component: Dashboard,
        icon: ThumbsUpDownOutlinedIcon,
        appendDivider: true,
         
    },
    {
        key: "router-home",
        title: "Practice Profile",
        tooltip: "Home",
        path: "/practice",
        enabled: true,
        component: Home,
        icon: ThumbUpOutlinedIcon,
        appendDivider: true
    },
    {
        key: "router-providers",
        title: "Provider",
        tooltip: "Provider",
        path: "/practice/provider",
        enabled: true,
        component: Provider,
        icon: AccountBalanceWalletOutlinedIcon,
        appendDivider: true,
        
    },
   {
        key: "router-Followup",
        title: "Followup",
        tooltip: "Follow Up",
        path: "/followup",
        enabled: true,
        component: viewFollow,
        icon: UpdateOutlinedIcon,
        appendDivider: true
    },
    {
        key: "router-gh",
        title: "Payer Portal",
        tooltip: "Payer Portal",
        enabled: true,
        icon: AccountBalanceWalletOutlinedIcon,
        appendDivider: true,
        
    },
    

    {
        key: "router-code",
        title: "Special Instructions",
        tooltip: "Code Editor",
        path: "#",
        enabled: true,
        component: NotFoundComponent,
        icon: AssignmentLateOutlinedIcon,
        appendDivider: true
    },

    {
        key: "router-codee",
        title: "Reports",
        tooltip: "Code Editor",
        path: "#",
        enabled: true,
        component: NotFoundComponent,
        icon: PollOutlinedIcon,
        appendDivider: true
    },

    {
        key: "router-codeee",
        title: "Change Password",
        tooltip: "Code Editor",
        path: "#",
        enabled: true,
        component: NotFoundComponent,
        icon: VpnKeyOutlinedIcon,
        appendDivider: true
    },
    {
        key: "router-codeeee",
        title: "Settings",
        tooltip: "Code Editor",
        path: "#",
        enabled: true,
        component: NotFoundComponent,
        icon: SettingsIcon,
        appendDivider: true
    },
    {
        key: "router-settings",
        title: "Logout",
        tooltip: "Settings",
        path: "/logout",
        enabled: true,
        component: LogOut,
        icon: ExitToAppOutlinedIcon
    },
]