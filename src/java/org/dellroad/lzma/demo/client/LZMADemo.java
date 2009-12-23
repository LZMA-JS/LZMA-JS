
/*
 * Copyright (C) 2009 Archie L. Cobbs. All rights reserved.
 *
 * $Id$
 */

package org.dellroad.lzma.demo.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.CommandCanceledException;
import com.google.gwt.user.client.DeferredCommand;
import com.google.gwt.user.client.IncrementalCommand;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.TextArea;
import com.google.gwt.user.client.ui.VerticalPanel;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.dellroad.lzma.client.CompressionMode;
import org.dellroad.lzma.client.LZMAByteArrayCompressor;
import org.dellroad.lzma.client.LZMAByteArrayDecompressor;
import org.dellroad.lzma.client.UTF8;

public class LZMADemo implements EntryPoint {

    private static final CompressionMode DEFAULT_COMPRESSION_MODE = CompressionMode.MODE_1;

    private final TextArea leftWindow = new TextArea();
    private final TextArea rightWindow = new TextArea();

    private final SimplePanel leftSizePanel = new SimplePanel();
    private final SimplePanel rightSizePanel = new SimplePanel();

    private CompressionMode mode = DEFAULT_COMPRESSION_MODE;

    private boolean compressing;

    public LZMADemo() {
        this.leftWindow.setCharacterWidth(70);
        this.leftWindow.setVisibleLines(25);
        this.rightWindow.setCharacterWidth(70);
        this.rightWindow.setVisibleLines(25);
    }

    public void onModuleLoad() {

        // Set up uncaught exception handler
        if (GWT.isScript()) {
            GWT.setUncaughtExceptionHandler(new GWT.UncaughtExceptionHandler() {
                public void onUncaughtException(Throwable e) {
                    if (e instanceof CommandCanceledException) {
                        if (compressing)
                            LZMADemo.this.rightSizePanel.setWidget(new Label("Compression canceled."));
                        else
                            LZMADemo.this.leftSizePanel.setWidget(new Label("Decompression canceled."));
                        return;
                    }
                    alert("Uncaught exception: " + e);
                }
            });
        }

        Button compressButton = new Button("Compress", new ClickHandler() {
            public void onClick(ClickEvent e) {
                compress();
            }
        });
        Button compressClearButton = new Button("Clear", new ClickHandler() {
            public void onClick(ClickEvent e) {
                LZMADemo.this.leftWindow.setText("");
                updateSizes(false);
            }
        });
        final ListBox modeBox = new ListBox();
        for (int i = 1; i <= 9; i++)
            modeBox.addItem("Level " + i, "" + i);
        modeBox.setSelectedIndex(DEFAULT_COMPRESSION_MODE.getLevel() - 1);
        modeBox.addChangeHandler(new ChangeHandler() {
            public void onChange(ChangeEvent ev) {
                LZMADemo.this.mode = CompressionMode.get(modeBox.getSelectedIndex() + 1);
            }
        });
        HorizontalPanel leftBottom = new HorizontalPanel();
        leftBottom.add(modeBox);
        leftBottom.add(compressButton);
        leftBottom.add(compressClearButton);
        leftBottom.add(this.leftSizePanel);

        Button decompressButton = new Button("Decompress", new ClickHandler() {
            public void onClick(ClickEvent e) {
                decompress();
            }
        });
        Button decompressClearButton = new Button("Clear", new ClickHandler() {
            public void onClick(ClickEvent e) {
                LZMADemo.this.rightWindow.setText("");
                updateSizes(false);
            }
        });
        HorizontalPanel rightBottom = new HorizontalPanel();
        rightBottom.add(decompressButton);
        rightBottom.add(decompressClearButton);
        rightBottom.add(this.rightSizePanel);

        VerticalPanel leftPanel = new VerticalPanel();
        leftPanel.setStylePrimaryName("demo-panel");
        leftPanel.add(this.leftWindow);
        leftPanel.add(leftBottom);

        VerticalPanel rightPanel = new VerticalPanel();
        rightPanel.setStylePrimaryName("demo-panel");
        rightPanel.add(rightWindow);
        rightPanel.add(rightBottom);

        HorizontalPanel hPanel = new HorizontalPanel();
        hPanel.setSpacing(5);
        hPanel.add(leftPanel);
        hPanel.add(rightPanel);

        RootPanel.get().add(hPanel);
    }

    public void compress() {
        this.rightWindow.setText("");
        updateSizes(false);
        this.rightSizePanel.setWidget(new Label("Compressing... 0%"));
        this.compressing = true;
        DeferredCommand.addCommand(new IncrementalCommand() {
            LZMAByteArrayCompressor c;
            public boolean execute() {
                if (c == null) {
                    c = new LZMAByteArrayCompressor(UTF8.encode(LZMADemo.this.leftWindow.getText()), LZMADemo.this.mode);
                    return true;
                }
                if (c.execute()) {
                    int pcent = (int)(c.getProgress() * 100.0);
                    LZMADemo.this.rightSizePanel.setWidget(new Label("Compressing... " + pcent + "%"));
                    return true;
                }
                setRightData(c.getCompressedData());
                updateSizes(true);
                return false;
            }
        });
    }

    public void decompress() {

        // Get binary data
        this.leftWindow.setText("");
        updateSizes(false);
        final byte[] data = getRightData(true);
        if (data == null)
            return;

        // Decompress it
        this.leftSizePanel.setWidget(new Label("Decompressing... 0%"));
        this.compressing = false;
        DeferredCommand.addCommand(new IncrementalCommand() {
            LZMAByteArrayDecompressor d;
            public boolean execute() {
                if (d == null) {
                    try {
                        d = new LZMAByteArrayDecompressor(data);
                    } catch (IOException e) {
                        LZMADemo.this.leftSizePanel.setWidget(new Label("Decompression failed: " + e.getMessage()));
                        return false;
                    }
                    return true;
                }
                if (d.execute()) {
                    int pcent = (int)(d.getProgress() * 100.0);
                    LZMADemo.this.leftSizePanel.setWidget(new Label("Decompressing... " + pcent + "%"));
                    return true;
                }
                IOException ioe = d.getException();
                if (ioe != null) {
                    LZMADemo.this.leftSizePanel.setWidget(new Label("Decompression failed: " + ioe.getMessage()));
                    return false;
                }
                String text;
                try {
                    text = UTF8.decode(d.getUncompressedData());
                } catch (IllegalArgumentException e) {
                    LZMADemo.this.leftSizePanel.setWidget(new Label("Decompression failed: " + e.getMessage()));
                    return false;
                }
                LZMADemo.this.leftWindow.setText(text);
                updateSizes(true);
                return false;
            }
        });
    }

    public void setRightData(byte[] data) {
        this.rightWindow.setText(prettyPrint(data));
    }

    public String prettyPrint(byte[] data) {
        StringBuilder buf = new StringBuilder();
        for (int i = 0; i < data.length; i++) {
            int b = data[i] & 0xff;
            buf.append(Character.forDigit(b >> 4, 16));
            buf.append(Character.forDigit(b & 0xf, 16));
            buf.append(i % 16 == 15 ? '\n' : ' ');
        }
        return buf.toString();
    }

    public byte[] getRightData(boolean alert) {
        ByteArrayOutputStream b = new ByteArrayOutputStream();
        String s = this.rightWindow.getText();
        boolean gothi = false;
        int hinib = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (" \t\f\n\r".indexOf(ch) != -1)
                continue;
            int digit = Character.digit(ch, 16);
            if (digit == -1) {
                if (alert)
                    alert("invalid compressed input: invalid hex character `" + ch + "'");
                return null;
            }
            if (gothi)
                b.write((hinib << 4) + digit);
            else
                hinib = digit;
            gothi = !gothi;
        }
        if (gothi) {
            if (alert)
                alert("invalid compressed input: odd number of digits");
            return null;
        }
        return b.toByteArray();
    }

    public void updateSizes(boolean pcent) {
        int uc = this.leftWindow.getText().length();
        this.leftSizePanel.setWidget(new Label(uc + " bytes"));
        byte[] rd = getRightData(false);
        String s = rd != null ?
          rd.length + " bytes" + (pcent && uc > 0 ? " (" + ((rd.length * 100 + 99) / uc) + "%)" : "") :
          "invalid hex input";
        this.rightSizePanel.setWidget(new Label(s));
    }

    public native void alert(String msg) /*-{
        $wnd.alert(msg);
    }-*/;
}

