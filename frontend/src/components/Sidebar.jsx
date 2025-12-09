import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, ChevronDown, ChevronRight, Activity, XOctagon, CheckCircle, Disc } from 'lucide-react';

function Sidebar() {
    return (
        <div className="sidebar-container">
            {/* User Profile / Brand */}
            <div className="sidebar-header">
                <div className="brand-icon">V</div>
                <div className="brand-info">
                    <span className="brand-name">Vault</span>
                    <span className="user-name">Anurag Yadav</span>
                </div>
                <ChevronDown size={16} />
            </div>

            <nav className="sidebar-nav">
                <div className="nav-item active">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </div>
                <div className="nav-item">
                    <Users size={20} />
                    <span>Nexus</span>
                </div>
                <div className="nav-item">
                    <FileText size={20} />
                    <span>Intake</span>
                </div>

                <div className="nav-group">
                    <div className="nav-group-header">
                        <Settings size={20} />
                        <span>Services</span>
                        <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
                    </div>
                    <div className="nav-subitems">
                        <div className="subitem">
                            <Disc size={16} /> <span>Pre-active</span>
                        </div>
                        <div className="subitem active-sub">
                            <Activity size={16} /> <span>Active</span>
                        </div>
                        <div className="subitem">
                            <XOctagon size={16} /> <span>Blocked</span>
                        </div>
                        <div className="subitem">
                            <CheckCircle size={16} /> <span>Closed</span>
                        </div>
                    </div>
                </div>

                <div className="nav-group">
                    <div className="nav-group-header">
                        <FileText size={20} />
                        <span>Invoices</span>
                        <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
                    </div>
                    <div className="nav-subitems">
                        <div className="subitem">
                            <span>Proforma Invoices</span>
                        </div>
                        <div className="subitem">
                            <span>Final Invoices</span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
