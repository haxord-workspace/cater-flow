import React from 'react';
import { EventStatus } from '../../types';

interface StatusBadgeProps {
  status: EventStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let badgeClass = 'badge-neutral';

  switch (status) {
    case 'Confirmed':
    case 'Completed':
    case 'Paid':
    case 'Approved':
    case 'Available':
      badgeClass = 'badge-success';
      break;
    case 'In Progress':
    case 'Preparation':
    case 'Quotation Sent':
    case 'Sent':
    case 'Reserved':
    case 'Partial':
      badgeClass = 'badge-info';
      break;
    case 'Enquiry':
    case 'Quotation Draft':
    case 'Draft':
    case 'Negotiation':
    case 'Pending':
      badgeClass = 'badge-warning';
      break;
    case 'Cancelled':
    case 'Declined':
    case 'Damaged':
    case 'Maintenance':
      badgeClass = 'badge-danger';
      break;
    case 'Converted':
    case 'Out for Event':
      badgeClass = 'badge-primary';
      break;
    default:
      badgeClass = 'badge-neutral';
  }

  return (
    <span className={`badge ${badgeClass} ${size === 'sm' ? 'btn-sm' : ''}`} style={{ fontSize: size === 'sm' ? '0.72rem' : '0.78rem' }}>
      <span className="badge-dot" />
      {status}
    </span>
  );
};
