import { useRef } from 'react'
import type { ItrUploadedFile } from '../../validation/itrUploadValidation'

export interface ItrUploadRowProps {
  id: string
  name: string
  formats: string
  icon?: string
  isUploaded: boolean
  fileInfo?: ItrUploadedFile
  onFileSelect: (id: string, file: File) => void
  onRemoveDoc: (id: string) => void
}

export const ItrUploadRow = ({
  id,
  name,
  formats,
  icon = '📄',
  isUploaded,
  fileInfo,
  onFileSelect,
  onRemoveDoc,
}: ItrUploadRowProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className={`itr-upload-row ${isUploaded ? 'itr-upload-row--done' : ''}`}>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onFileSelect(id, f)
          e.target.value = ''
        }}
        aria-label={`Upload ${name}`}
      />
      <div className="itr-upload-row-left">
        <span className="itr-upload-icon">{icon}</span>
        <div>
          <div className="itr-upload-name">{name}</div>
          {fileInfo ? (
            <div className="itr-uploaded-file-meta">
              <span className="itr-uploaded-filename">📄 {fileInfo.name}</span>
              <span className="itr-uploaded-filesize">({fileInfo.size})</span>
            </div>
          ) : (
            <div className="itr-upload-formats">{formats}</div>
          )}
        </div>
      </div>
      <div className="itr-upload-actions">
        {fileInfo && (
          <button
            type="button"
            className="itr-upload-remove-btn"
            onClick={() => onRemoveDoc(id)}
            title="Remove document"
            aria-label={`Remove ${name}`}
          >
            ✕
          </button>
        )}
        <button
          type="button"
          className={`itr-upload-btn ${isUploaded ? 'itr-upload-btn--done' : ''}`}
          onClick={() => inputRef.current?.click()}
        >
          {isUploaded ? '✓ Uploaded' : 'Upload'}
        </button>
      </div>
    </div>
  )
}
