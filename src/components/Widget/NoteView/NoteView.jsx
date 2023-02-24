import classNames from 'classnames/bind';
import styles from './NoteView.module.scss';
import Input from '../Input';
import Button from '../Button';
import NotePopupButton from '../NotePopupButton';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import noteApi from '../../../api/noteApi';
import { toast } from 'react-toastify';
import { history } from '../../../utils/history';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppSelector } from '../../../app/hook';
import { selectCurrentUser } from '../../Layout/Login/authSlice';

const cx = classNames.bind(styles);

function NoteView(props) {
  const { data, onlyView, isCreatePage, isEditPage, disableEdit } = props;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = useAppSelector(selectCurrentUser) || { username: '' };
  const reFormatTime = (time) => {
    let date = new Date(time);
    if (isCreatePage) {
      date = new Date(Date.now());
    }

    let h = date.getHours();
    let m = date.getMinutes();
    let d = date.getDay();
    let _m = date.getMonth();
    let y = date.getFullYear();

    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    if (_m < 10) _m = '0' + _m;

    return `${h}:${m} ${d}/${_m}/${y}`;
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeBody = (e) => {
    setBody(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleShareClick = () => {
    const urlShare = `${window.location.origin}/view/${data.permalink}`;
    // prompt('Copy this link to share note', urlShare);
    navigator.clipboard.writeText(urlShare);
    toast.success('Copy success');
  };

  const handleCreateNote = async () => {
    let check = true;
    if (title.trim().length === 0) {
      check = false;
      toast.warning('Title is required');
    }

    if (body.trim().length === 0) {
      check = false;
      toast.warning('Content is required');
    }

    if (check) {
      const ahihi = new Promise(async (resolve, reject) => {
        const resData = await noteApi.create({
          title: title,
          body: body,
          tags: category,
          password: password.trim(),
        });
        if (resData.code === 200) resolve(resData);
        else reject(resData);
      });

      toast.promise(ahihi, {
        pending: {
          render() {
            return 'Please wait...';
          },
        },
        success: {
          render({ data }) {
            history.push(`/view/${data.elements.note.permalink}`);
            return data.message;
          },
        },
        error: {
          render({ data }) {
            return data.message;
          },
        },
      });
    }
  };

  const handleEditNote = async () => {
    if (disableEdit) {
      let check = true;
      if (title.trim().length === 0) {
        check = false;
        toast.warning('Title is required');
      }

      if (body.trim().length === 0) {
        check = false;
        toast.warning('Content is required');
      }

      if (check) {
        const ahihi = new Promise(async (resolve, reject) => {
          const resData = await noteApi.edit({
            permalink: data.permalink,
            title: title,
            body: body,
            tags: category,
            password: password.trim(),
          });
          if (resData.code === 200) resolve(resData);
          else reject(resData);
        });

        toast.promise(ahihi, {
          pending: {
            render() {
              return 'Please wait...';
            },
          },
          success: {
            render({ data }) {
              history.push(`/view/${data.elements.note.permalink}`);
              return data.message;
            },
          },
          error: {
            render({ data }) {
              return data.message;
            },
          },
        });
      }
    } else {
      toast.error('Cannot edit this note');
    }
  };

  useEffect(() => {
    setTitle(data.title);
    setBody(data.body);
    setCategory(data.tags);
  }, [data.title, data.body, data.tags]);

  return (
    <div className={cx('note')}>
      <div className={cx('note-header')}>
        <div className={cx('note-header-wrapper')}>
          <span className={cx('note-header-date')}>
            By: {data.username} - {reFormatTime(data.created_at)} - {data.view}{' '}
            views
          </span>
          {onlyView ? (
            <pre className={cx('note-header-title')}>{title}</pre>
          ) : (
            <TextareaAutosize
              className={cx('note-header-title')}
              value={title}
              disabled={onlyView}
              placeholder="Enter your title..."
              onChange={handleChangeTitle}
            />
          )}
        </div>
        {!isCreatePage && !isEditPage && (
          <div className={cx('note-header-wrapper')}>
            <button
              className={cx('note-header-btn')}
              onClick={handleShareClick}
            >
              <FontAwesomeIcon icon={faShare} />
              <span className={cx('note-header-btn-text')}>Share</span>
            </button>
            {currentUser.username === data.username && (
              <NotePopupButton
                permalink={data.permalink}
                isProtected={data.isProtected}
              />
            )}
          </div>
        )}
      </div>
      {/* <TextareaAutosize
        value={body}
        ref={textareaRef}
        onChange={handleChange}
      ></TextareaAutosize> */}

      {onlyView ? (
        <pre className={cx('note-body')}>{body}</pre>
      ) : (
        <TextareaAutosize
          className={cx('note-body')}
          value={body}
          onChange={handleChangeBody}
          placeholder="Enter your text..."
          disabled={onlyView}
        />
      )}
      {(isCreatePage || isEditPage) && (
        <div className={cx('note-footer')}>
          <div className={cx('note-footer-wrapper')}>
            <TextareaAutosize
              className={cx('note-footer-category')}
              value={category}
              onChange={handleChangeCategory}
              placeholder='Enter your category, each category is separated by a comma ","'
            />
          </div>
          <div className={cx('note-footer-wrapper')}>
            <Input
              type="password"
              placeholder="Password to protect the note (you can leave this field blank)"
              value={password}
              onChange={handleChangePassword}
            />
            <Button
              primary
              label={isEditPage ? 'Edit' : 'Create'}
              onClick={isEditPage ? handleEditNote : handleCreateNote}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteView;
