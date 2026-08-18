import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Bell, Moon, Shield, Save, Check } from 'lucide-react';
import { getUserProfile, updateSettings } from '../../services/ProfileAPI';

const ToggleSwitch = ({ enabled, onChange, testId }) => (
  <button
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getUserProfile();
        setSettingsData(data);
      } catch {
        setError('Failed to load settings.');