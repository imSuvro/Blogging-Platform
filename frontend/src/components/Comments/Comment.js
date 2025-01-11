// src/components/Comments/Comment.js

import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Comment = ({ comment }) => {
    // Parse the ISO date string
    const commentDate = parseISO(comment.date);
    // Format the date to a relative time (e.g., "2 minutes ago")
    const timeAgo = formatDistanceToNow(commentDate, { addSuffix: true });

    // Generate initials from the user's name
    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        const initials = nameParts.map((part) => part[0]).join('');
        return initials.toUpperCase();
    };

    const initials = getInitials(comment.user.name);

    return (
        <li className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            {/* Avatar with Initials */}
            <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white text-lg font-bold">
                    {initials}
                </div>
            </div>
            {/* Comment Content */}
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{comment.user.name}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</span>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>
            </div>
        </li>
    );
};

export default Comment;
