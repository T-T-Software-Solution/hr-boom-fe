import {
  checkFileUrl,
  getFileUrl,
  placeholderImage,
  viewFileInNewTabOrDownload,
} from './file';

describe('getFileUrl', () => {
  it('should return the placeholder image if no fileName is provided', () => {
    const result = getFileUrl(null);
    expect(result).toEqual({
      fullPath: placeholderImage,
      fileName: placeholderImage,
      originalFileName: null,
    });
  });

  it('should return the external URL and file name when given a well-formed external URL', () => {
    const result = getFileUrl('https://example.com/image.jpg');
    expect(result).toEqual({
      fullPath: 'https://example.com/image.jpg',
      fileName: 'image.jpg',
      originalFileName: 'https://example.com/image.jpg',
    });
  });

  it('should return the local API file path and the correct file name if fileName contains special characters', () => {
    const result = getFileUrl('example file @!.jpg');
    expect(result).toEqual({
      fullPath: '/api/file/example file @!.jpg',
      fileName: 'example file @!.jpg',
      originalFileName: 'example file @!.jpg',
    });
  });

  it('should handle file names with directory structure and return the correct path', () => {
    const result = getFileUrl('folder/subfolder/example file @!.jpg');
    expect(result).toEqual({
      fullPath: '/api/file/folder/subfolder/example file @!.jpg',
      fileName: 'example file @!.jpg',
      originalFileName: 'folder/subfolder/example file @!.jpg',
    });
  });
});

describe('viewFileInNewTabOrDownload', () => {
  beforeEach(() => {
    // Mock window.open
    global.window.open = vi.fn();

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'blob:mocked-url');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should open a new tab with the File object URL if uploadFile is a File', () => {
    const mockFile = new File(['dummy content'], 'example.txt', {
      type: 'text/plain',
    });
    viewFileInNewTabOrDownload({ uploadFile: mockFile, previewFile: null });

    expect(window.open).toHaveBeenCalledWith('blob:mocked-url', '_blank');
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
  });

  it('should open a new tab with the previewFile URL if uploadFile is a string', () => {
    const previewFile = 'https://example.com/image.jpg';
    viewFileInNewTabOrDownload({
      uploadFile: 'some-uploaded-file',
      previewFile,
    });

    expect(window.open).toHaveBeenCalledWith(previewFile, '_blank');
  });

  it('should not open a new tab if neither uploadFile nor previewFile is provided', () => {
    viewFileInNewTabOrDownload({ uploadFile: null, previewFile: null });

    expect(window.open).not.toHaveBeenCalled();
  });
});

describe('checkFileUrl', () => {
  it('should return false if uploadFile is a File', () => {
    const mockFile = new File(['dummy content'], 'example.txt', {
      type: 'text/plain',
    });
    const result = checkFileUrl({ uploadFile: mockFile, previewFile: null });

    expect(result).toBe(false);
  });

  it('should return false if uploadFile is a string and previewFile is provided', () => {
    const result = checkFileUrl({
      uploadFile: 'some-uploaded-file',
      previewFile: 'https://example.com/image.jpg',
    });

    expect(result).toBe(false);
  });

  it('should return true if no uploadFile or previewFile is provided', () => {
    const result = checkFileUrl({ uploadFile: null, previewFile: null });

    expect(result).toBe(true);
  });

  it('should return true if uploadFile is a string and previewFile is not provided', () => {
    const result = checkFileUrl({
      uploadFile: 'some-uploaded-file',
      previewFile: null,
    });

    expect(result).toBe(true);
  });
});

describe('checkFileUrl', () => {
  it('should return false if uploadFile is a File', () => {
    const mockFile = new File(['dummy content'], 'example.txt', {
      type: 'text/plain',
    });
    const result = checkFileUrl({ uploadFile: mockFile, previewFile: null });

    expect(result).toBe(false);
  });

  it('should return false if uploadFile is a string and previewFile is provided', () => {
    const result = checkFileUrl({
      uploadFile: 'some-uploaded-file',
      previewFile: 'https://example.com/image.jpg',
    });

    expect(result).toBe(false);
  });

  it('should return true if no uploadFile or previewFile is provided', () => {
    const result = checkFileUrl({ uploadFile: null, previewFile: null });

    expect(result).toBe(true);
  });

  it('should return true if uploadFile is a string and previewFile is not provided', () => {
    const result = checkFileUrl({
      uploadFile: 'some-uploaded-file',
      previewFile: null,
    });

    expect(result).toBe(true);
  });
});
