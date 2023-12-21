import React from 'react';
import AccountLayout from '../../account';
import Button from '@/ui/form/Button';
import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { URLS } from '@/utils/URLS';
interface PublishAdActionsProps extends CreateAddFormActionsType { }
const PublishAdActions = (props: PublishAdActionsProps) => {

  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const addID = searchParams.get("add_id")
  const handleSubmit = () => {
    props.submitForm()
  }
  const isPlanSelected = props.values.plan.name ? true : false
  const handlePreviewAdd = async () => {
    const result = await props.validateForm()
    if (Object.keys(result).length > 0) {
      props.submitForm()
    } else {
      // navigate to preview page.
      console.log("navigating")
      localStorage.setItem("preview_add", JSON.stringify(props.values))
      window.open(URLS.PREVIEW_PRODUCT, '_blank')
    }
  }
  return (
    <AccountLayout>
      <h1 className="text-center text-18px font-light">
        Our <span className="text-brand_yellow-500">terms of use</span> apply .
        You can find information on the processing of your data in our{' '}
        <span className="text-brand_yellow-500">privacy policy.</span>
      </h1>
      <div className="mt-2.5 flex flex-col md:flex-row md:items-center md:justify-center md:w-2/3 lg:w-1/2 mx-auto gap-3">
        <Button disabled={isPlanSelected && !addID} onClick={handleSubmit} type="button" className="bg-transparent  text-black p-0">Place an Ad</Button>
        <Button disabled={!isPlanSelected || addID ? true : false} onClick={handleSubmit} type="button" className='p-0'>Pay & Place an Ad</Button>
        <Button onClick={handlePreviewAdd} type="button" className="bg-transparent text-black p-0">Preview</Button>
      </div >
    </AccountLayout >
  );
};

export default PublishAdActions;
