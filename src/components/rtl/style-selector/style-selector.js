
"use client"
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const StyleSelectors = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [removeSelection, setRemoveSelector] = useState(true)
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    if (!mounted) {
        return null;
    }
    return (
        <div className={`style-settings ${removeSelection ? 'opened' : ''}`}>
            <div className="style-settings-icon" onClick={() => {
                setRemoveSelector(!removeSelection)
            }}>&nbsp;</div>
            <div className="style-settings-content">

                <h4>Açık/Koyu Mod</h4>
                <ul>
                    <li className="clearfix">
                        <label>Tema Seçeneği</label>
                        <select name="color_scheme"
                            value={theme}
                            onChange={(e) => handleThemeChange(e.target.value)}>
                            <option
                                value="light"
                                className="light-button"
                            >
                                Açık
                            </option>
                            <option value="skin-dark" className="dark-button">
                                Koyu
                            </option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default StyleSelectors;
