import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Heart, CreditCard, Phone } from 'lucide-react';

interface DonationFormProps {
  preselectedType?: 'orphan' | 'orphanage' | 'campaign' | 'disaster';
  preselectedId?: string;
  preselectedName?: string;
  onSubmit: (data: DonationFormData) => void;
  isLoading: boolean;
}

export interface DonationFormData {
  amount: number;
  donationType: 'orphan' | 'orphanage' | 'campaign' | 'disaster';
  targetId: string;
  paymentMethod: 'mpesa' | 'airtel' | 'tigo' | 'card';
  isAnonymous: boolean;
  message?: string;
}

const amounts = [10, 25, 50, 100, 250, 500];

const DonationForm: React.FC<DonationFormProps> = ({
  preselectedType,
  preselectedId,
  preselectedName,
  onSubmit,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(amounts[2]);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationFormData>({
    defaultValues: {
      amount: amounts[2],
      donationType: preselectedType || 'campaign',
      targetId: preselectedId || '',
      paymentMethod: 'mpesa',
      isAnonymous: false,
    },
  });

  const handleAmountSelect = (amount: number | null) => {
    setSelectedAmount(amount);
    if (amount !== null) {
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const processForm = (data: DonationFormData) => {
    const finalAmount = selectedAmount || Number(customAmount);
    onSubmit({
      ...data,
      amount: finalAmount,
    });
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-6">
      {preselectedType && preselectedId && preselectedName ? (
        <div className="p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {t('donation.donatingTo')}:
          </p>
          <p className="font-medium text-primary-800">{preselectedName}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {t('donation.donateToLabel')}
          </label>
          <select
            {...register('donationType', { required: true })}
            className="input"
          >
            <option value="campaign">{t('donation.campaign')}</option>
            <option value="orphanage">{t('donation.orphanage')}</option>
            <option value="orphan">{t('donation.orphan')}</option>
            <option value="disaster">{t('donation.disaster')}</option>
          </select>
          {errors.donationType && (
            <p className="text-error-600 text-sm">{t('validation.required')}</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {t('donation.amount')}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {amounts.map((amount) => (
            <button
              key={amount}
              type="button"
              className={`py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                selectedAmount === amount
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleAmountSelect(amount)}
            >
              {t('common.currency')} {amount}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">
            {t('donation.customAmount')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{t('common.currencySymbol')}</span>
            </div>
            <input
              type="number"
              min="1"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter amount"
              className="input pl-8"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {t('donation.paymentMethod')}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
            'mpesa' === 'mpesa' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}>
            <input
              type="radio"
              {...register('paymentMethod')}
              value="mpesa"
              className="sr-only"
              defaultChecked
            />
            <Phone className="h-5 w-5 text-primary-600 mr-2" />
            <span>M-Pesa</span>
          </label>
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
            'card' === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}>
            <input
              type="radio"
              {...register('paymentMethod')}
              value="card"
              className="sr-only"
            />
            <CreditCard className="h-5 w-5 text-primary-600 mr-2" />
            <span>{t('donation.card')}</span>
          </label>
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
            'airtel' === 'airtel' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}>
            <input
              type="radio"
              {...register('paymentMethod')}
              value="airtel"
              className="sr-only"
            />
            <Phone className="h-5 w-5 text-primary-600 mr-2" />
            <span>Airtel Money</span>
          </label>
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
            'tigo' === 'tigo' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}>
            <input
              type="radio"
              {...register('paymentMethod')}
              value="tigo"
              className="sr-only"
            />
            <Phone className="h-5 w-5 text-primary-600 mr-2" />
            <span>Tigo Pesa</span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {t('donation.message')} ({t('common.optional')})
        </label>
        <textarea
          {...register('message')}
          rows={3}
          className="input"
          placeholder={t('donation.messagePlaceholder')}
        ></textarea>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="anonymous"
          {...register('isAnonymous')}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
          {t('donation.anonymous')}
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || (!selectedAmount && !customAmount)}
        className="w-full btn-primary py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Heart className="h-5 w-5 mr-2" />
        <span>
          {isLoading
            ? t('common.processing')
            : t('donation.donate', {
                amount: selectedAmount || customAmount,
                currency: t('common.currency'),
              })}
        </span>
      </button>
    </form>
  );
};

export default DonationForm;