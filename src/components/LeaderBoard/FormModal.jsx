'use client';

import styles from '@/style/modal.module.css';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { FormField } from '../FormField';
import { sanitizeSimpleInputs } from '../utils';

export default function FormModal({ totalTime, gameId, open = false }) {
  const nameRef = useRef();
  const router = useRouter();

  function escapeRegExp(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
  };

  async function publishLeaderboard(e) {
    e.preventDefault();
    const data = sanitizeSimpleInputs({
      userName: escapeRegExp(nameRef.current.value.trim()),
      userTime: parseInt(totalTime)
    })
    
    try {
      const resp = await fetch(`/api/leaderboard/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (resp.ok) {
        toast.success('Score published, redirecting!!');
        router.push(`/leaderboard/${gameId}`)
      } else {
        toast.error(resp.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      nameRef.current.value = '';
    }
  }

  
  return (
    <dialog className={styles.modal} open={open}>
      <div className={styles.modalContent}>
        <Form className={styles.modalForm} onSubmit={publishLeaderboard}>
          <FormField name={'name'} label={'Player Name'} placeholder={'Enter your name'} ref={nameRef} />
          <div style={{ justifySelf: 'center' }}>
            <button>Publish Score</button>
          </div>
        </Form>
      </div>
    </dialog>
  )
}
