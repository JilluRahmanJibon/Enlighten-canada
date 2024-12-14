"use client";


import ProfileDetails from '@/components/profile/ProfileDetails'
import { useParams } from 'next/navigation';
import React from 'react'
const page = () =>
{
  const { id } = useParams();
  return (
    <div><ProfileDetails userId={id} /></div>
  )
}

export default page