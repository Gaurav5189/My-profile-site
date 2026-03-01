import React from 'react';
import './Preloader.css';

export default function Preloader({ isLoading }) {
    // We render it fading out by adding a fade-out CSS class just before unmounting,
    // but for simplicity, returning null or fading an active layer works.
    // Let's rely on standard conditional rendering for unmount.
    // Or keep it mounted and fade opacity. We'll keep it active and fade it.

    return (
        <div className={`preloader-fixed ${!isLoading ? 'fade-out' : ''}`}>
            <div className="tetrominos">
                <div className="tetromino box1"></div>
                <div className="tetromino box2"></div>
                <div className="tetromino box3"></div>
                <div className="tetromino box4"></div>
            </div>
        </div>
    );
}
