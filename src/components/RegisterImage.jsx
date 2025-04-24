'use client';

import React, { useRef, useState } from 'react';
import Form from 'next/form'
import { FormField } from './FormField';
import { registerImageAction } from '@/app/actions/register';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterImage() {
  const [submitting,isSubmitting] = useState(false);
  const router = useRouter();
  const titleRef = useRef();
  const urlRef = useRef();
  const widthRef = useRef();
  const heightRef = useRef();
  const t1NameRef = useRef();
  const t1UrlRef = useRef();
  const t1BBRef = useRef();
  const t2NameRef = useRef();
  const t2UrlRef = useRef();
  const t2BBRef = useRef();

  let formStyle = {
    display:'grid',gap:'0.5em', padding: '0.4em 0.5em',
    width: 'min(95%,450px)', margin: '0 auto', borderRadius: '0.5em',
    boxShadow:'rgba(0, 0, 0, 0.05) 0px 0px 0px 3px'
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  
  function parseBoundingBoxes(bbString) {
    try {
      const boxes = JSON.parse(bbString);
      if (!Array.isArray(boxes)) return null;
  
      for (let box of boxes) {
        if (
          typeof box.top !== 'number' || box.top < 0 || box.top > 100 ||
          typeof box.left !== 'number' || box.left < 0 || box.left > 100 ||
          typeof box.width !== 'number' || box.width <= 0 || box.width > 100 ||
          typeof box.height !== 'number' || box.height <= 0 || box.height > 100
        ) {
          return null;
        }
      }
  
      return boxes;
    } catch {
      return null;
    }
  }

  function resetForm(){
    titleRef.current.value = '';
    urlRef.current.value = '';
    widthRef.current.value = '';
    heightRef.current.value = '';
    t1NameRef.current.value = '';
    t1UrlRef.current.value = '';
    t1BBRef.current.value = '';
    t2NameRef.current.value = '';
    t2UrlRef.current.value = '';
    t2BBRef.current.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    isSubmitting(true);

    const formData = {
      title: titleRef.current.value.trim(),
      url: urlRef.current.value.trim(),
      width: parseInt(widthRef.current.value),
      height: parseInt(heightRef.current.value),
      t1Name: t1NameRef.current.value.trim(),
      t1Url: t1UrlRef.current.value.trim(),
      t1BoundBox: t1BBRef.current.value.trim(),
      t2Name: t2NameRef.current.value.trim(),
      t2Url: t2UrlRef.current.value.trim(),
      t2BoundBox: t2BBRef.current.value.trim(),
    }

    if (!isValidUrl(formData.url) || !isValidUrl(formData.t1Url) || !isValidUrl(formData.t2Url)) {
      toast.error('Please enter valid URLs.');
      return;
    }
  
    if (isNaN(formData.width) || formData.width <= 0 || isNaN(formData.height) || formData.height <= 0) {
      toast.error('Image width and height must be positive numbers.');
      return;
    }
  
    const t1Boxes = parseBoundingBoxes(formData.t1BoundBox);
    const t2Boxes = parseBoundingBoxes(formData.t2BoundBox);
  
    if (!t1Boxes || !t2Boxes) {
      toast.error('Invalid bounding box format. Use valid JSON with percentage values.');
      return;
    }

    formData.t1BoundBox = t1Boxes;
    formData.t2BoundBox = t2Boxes;

    try {
      const res = await registerImageAction(formData);
      
      if (res.success) {
        toast.success(res.message);
        resetForm();
        router.push('/');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('Failed to submit: ' + error.message);
    } finally {
      isSubmitting(false);
    }
  }

  return (
    <div>
      <Form style={formStyle} onSubmit={handleSubmit}>
        <FormField name={'title'} label={'Game Title'} placeholder={'Enter game title'} ref={titleRef} />
        <FormField name={'url'} label={'Image URL:'} placeholder={'Enter image url'} ref={urlRef} />
        <FormField name={'width'} label={'Image width:'} type='number' placeholder={'Enter image width in px'} ref={widthRef} />
        <FormField name={'height'} label={'Image height:'} type='number' placeholder={'Enter image height in px'} ref={heightRef} />
        <FormField name={'target1-name'} label={'Target 1 Name:'} placeholder={'Enter target name'} ref={t1NameRef} />
        <FormField name={'target1-url'} label={'Target 1 URL:'} placeholder={'Enter image url'} ref={t1UrlRef} />
        <FormField name={'target1-bb'} label={'Target 1 Relative Bounding Box:'} placeholder={'E.g. [{"top": 30, "left": 45, "width": 5, "height": 8}]'} ref={t1BBRef} />
        <FormField name={'target2-name'} label={'Target 2 Name:'} placeholder={'Enter target name'} ref={t2NameRef} />
        <FormField name={'target2-url'} label={'Target 2 URL:'} placeholder={'Enter image url'} ref={t2UrlRef} />
        <FormField name={'target2-bb'} label={'Target 2 Relative Bounding Box:'} placeholder={'E.g. [{"top": 30, "left": 45, "width": 5, "height": 8}]'} ref={t2BBRef} />
        <div style={{display: 'flex'}}>
          <button style={{margin: '0 auto'}} type="submit" disabled={submitting}>Register image</button>
        </div>
      </Form>
    </div>
  )
}
